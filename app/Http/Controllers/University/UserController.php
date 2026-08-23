<?php

namespace App\Http\Controllers\University;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        $this->authorize('user.view');

        return Inertia::render('University/Users/Index', [
            'users' => User::query()->with('roles')->where('university_id', auth()->user()->university_id)->latest()->paginate(20),
            'roles' => ['Student', 'Coordinator', 'Faculty', 'University Admin'],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $this->authorize('user.create');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'role' => ['required', 'in:Student,Coordinator,Faculty,University Admin'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'university_id' => $request->user()->university_id,
        ]);
        $user->assignRole($validated['role']);

        return back()->with('success', 'User created.');
    }

    public function destroy(User $user): RedirectResponse
    {
        $this->authorize('user.delete');

        abort_if($user->university_id !== auth()->user()->university_id, 403);
        abort_if($user->id === auth()->id(), 422, 'You cannot delete your own account.');
        $user->delete();

        return back()->with('success', 'User deleted.');
    }
}
