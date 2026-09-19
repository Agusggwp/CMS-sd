<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function index(): Response
    {
        $events = Event::orderBy('start_date', 'desc')->paginate(10);

        return Inertia::render('Admin/Events/Index', [
            'events' => $events,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Events/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'nullable|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . time();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('events', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        Event::create($validated);

        return redirect()->route('admin.events.index')->with('success', 'Agenda berhasil ditambahkan.');
    }

    public function edit(Event $event): Response
    {
        return Inertia::render('Admin/Events/Edit', [
            'event' => $event,
        ]);
    }

    public function update(Request $request, Event $event): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'nullable|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($event->image && Str::startsWith($event->image, '/storage/')) {
                Storage::disk('public')->delete(Str::replaceFirst('/storage/', '', $event->image));
            }
            $path = $request->file('image')->store('events', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        $event->update($validated);

        return redirect()->route('admin.events.index')->with('success', 'Agenda berhasil diperbarui.');
    }

    public function destroy(Event $event): RedirectResponse
    {
        if ($event->image && Str::startsWith($event->image, '/storage/')) {
            Storage::disk('public')->delete(Str::replaceFirst('/storage/', '', $event->image));
        }

        $event->delete();

        return redirect()->route('admin.events.index')->with('success', 'Agenda berhasil dihapus.');
    }
}
