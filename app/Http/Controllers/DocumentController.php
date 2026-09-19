<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class DocumentController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->input('search');

        $documents = Document::when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Public/Documents', [
            'documents' => $documents,
            'filters' => ['search' => $search],
        ]);
    }

    public function download(Document $document)
    {
        $document->increment('download_count');

        if (Storage::disk('public')->exists($document->file)) {
            return Storage::disk('public')->download($document->file, $document->title . '.' . pathinfo($document->file, PATHINFO_EXTENSION));
        }

        // Return back with notice if file is demo dummy
        return back()->with('success', 'Dokumen contoh: ' . $document->title);
    }
}
