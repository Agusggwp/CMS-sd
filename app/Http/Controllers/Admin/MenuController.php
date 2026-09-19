<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    public function index(): Response
    {
        $menus = Menu::with('parent')
            ->orderBy('order', 'asc')
            ->get();

        return Inertia::render('Admin/Menus/Index', [
            'menus' => $menus,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'label' => 'required|string|max:100',
            'url' => 'required|string|max:255',
            'order' => 'integer|min:0',
            'location' => 'required|string|in:header,footer',
            'is_active' => 'boolean',
            'parent_id' => 'nullable|exists:menus,id',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);

        Menu::create($validated);

        return redirect()->route('admin.menus.index')->with('success', 'Menu berhasil ditambahkan.');
    }

    public function update(Request $request, Menu $menu): RedirectResponse
    {
        $validated = $request->validate([
            'label' => 'required|string|max:100',
            'url' => 'required|string|max:255',
            'order' => 'integer|min:0',
            'location' => 'required|string|in:header,footer',
            'is_active' => 'boolean',
            'parent_id' => 'nullable|exists:menus,id',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);

        $menu->update($validated);

        return redirect()->route('admin.menus.index')->with('success', 'Menu berhasil diperbarui.');
    }

    public function destroy(Menu $menu): RedirectResponse
    {
        $menu->delete();

        return redirect()->route('admin.menus.index')->with('success', 'Menu berhasil dihapus.');
    }
}
