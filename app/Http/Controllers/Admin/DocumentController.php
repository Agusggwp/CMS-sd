<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Document;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class DocumentController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->input('search');

        $documents = Document::when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Admin/Documents/Index', [
            'documents' => $documents,
            'filters' => ['search' => $search],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Documents/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'file' => 'required|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx,zip|max:10240',
        ]);

        $file = $request->file('file');
        $path = $file->store('documents', 'public');

        $sizeInBytes = $file->getSize();
        $sizeFormatted = $sizeInBytes >= 1048576 
            ? round($sizeInBytes / 1048576, 2) . ' MB' 
            : round($sizeInBytes / 1024, 1) . ' KB';

        Document::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'file' => $path,
            'type' => strtoupper($file->getClientOriginalExtension()),
            'size' => $sizeFormatted,
            'download_count' => 0,
        ]);

        return redirect()->route('admin.documents.index')->with('success', 'Dokumen berhasil diunggah.');
    }

    public function edit(Document $document): Response
    {
        return Inertia::render('Admin/Documents/Edit', [
            'document' => $document,
        ]);
    }

    public function update(Request $request, Document $document): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'file' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx,zip|max:10240',
        ]);

        $document->title = $validated['title'];
        $document->description = $validated['description'] ?? null;

        if ($request->hasFile('file')) {
            if ($document->file && Storage::disk('public')->exists($document->file)) {
                Storage::disk('public')->delete($document->file);
            }
            $file = $request->file('file');
            $path = $file->store('documents', 'public');
            $sizeInBytes = $file->getSize();
            $document->file = $path;
            $document->type = strtoupper($file->getClientOriginalExtension());
            $document->size = $sizeInBytes >= 1048576 
                ? round($sizeInBytes / 1048576, 2) . ' MB' 
                : round($sizeInBytes / 1024, 1) . ' KB';
        }

        $document->save();

        return redirect()->route('admin.documents.index')->with('success', 'Dokumen berhasil diperbarui.');
    }

    public function destroy(Document $document): RedirectResponse
    {
        if ($document->file && Storage::disk('public')->exists($document->file)) {
            Storage::disk('public')->delete($document->file);
        }

        $document->delete();

        return redirect()->route('admin.documents.index')->with('success', 'Dokumen berhasil dihapus.');
    }
}
