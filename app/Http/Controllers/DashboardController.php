<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Certificate;
use App\Models\Department;
use App\Models\Event;
use App\Models\EventCategory;
use App\Models\Feedback;
use App\Models\Registration;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $user = $request->user();
        $roles = $user->getRoleNames();

        $data = [
            'roles' => $roles,
            'stats' => $this->baseStats($user),
            'recentEvents' => Event::query()
                ->where('status', 'published')
                ->orderBy('start_at')
                ->limit(5)
                ->get(['id', 'title', 'slug', 'start_at', 'status']),
        ];

        if ($roles->contains('Student')) {
            $data['studentProfile'] = [
                'name' => $user->name,
                'email' => $user->email,
                'student_id' => $user->student_id,
                'phone' => $user->phone,
                'department' => $user->department?->name,
            ];

            $data['studentStats'] = [
                'certificates' => Certificate::query()
                    ->whereHas('registration', fn ($q) => $q->where('user_id', $user->id))
                    ->count(),
                'pending_feedback' => Registration::query()
                    ->where('user_id', $user->id)
                    ->whereNotNull('attended_at')
                    ->whereDoesntHave('feedback')
                    ->count(),
            ];
        }

        if ($roles->contains('Coordinator')) {
            $myEvents = Event::query()->where('organizer_id', $user->id);
            $eventIds = (clone $myEvents)->pluck('id');

            $data['coordinatorStats'] = [
                'total_events' => $myEvents->count(),
                'published_events' => (clone $myEvents)->where('status', 'published')->count(),
                'pending_events' => (clone $myEvents)->where('status', 'pending')->count(),
                'registrations' => Registration::query()->whereIn('event_id', $eventIds)->where('status', 'registered')->count(),
                'attendance' => Registration::query()->whereIn('event_id', $eventIds)->whereNotNull('attended_at')->count(),
            ];
        }

        if ($roles->contains('Faculty')) {
            $data['facultyStats'] = [
                'pending_approvals' => Event::query()
                    ->where(function ($q) use ($user) {
                        $q->where('faculty_advisor_id', $user->id)
                            ->orWhere(fn ($inner) => $inner->whereNull('faculty_advisor_id')->where('department_id', $user->department_id));
                    })
                    ->where('status', 'pending')
                    ->count(),
                'department_events' => Event::query()
                    ->where('department_id', $user->department_id)
                    ->count(),
            ];
        }

        if ($roles->intersect(['Super Admin', 'University Admin'])->isNotEmpty()) {
            $isUniversityAdmin = $roles->contains('University Admin') && ! $roles->contains('Super Admin');
            $universityId = $isUniversityAdmin ? $user->university_id : null;
            $userQuery = User::query();
            $eventQuery = Event::query();
            $registrationQuery = Registration::query();
            $attendanceQuery = Attendance::query();
            $certificateQuery = Certificate::query();
            $feedbackQuery = Feedback::query();
            $departmentQuery = Department::query();
            $categoryQuery = EventCategory::query();

            if ($universityId !== null) {
                $userQuery->where('university_id', $universityId);
                $eventQuery->whereHas('organizer', fn ($query) => $query->where('university_id', $universityId));
                $registrationQuery->whereHas('event.organizer', fn ($query) => $query->where('university_id', $universityId));
                $attendanceQuery->whereHas('event.organizer', fn ($query) => $query->where('university_id', $universityId));
                $certificateQuery->whereHas('registration.event.organizer', fn ($query) => $query->where('university_id', $universityId));
                $feedbackQuery->whereHas('event.organizer', fn ($query) => $query->where('university_id', $universityId));
                $departmentQuery->where('university_id', $universityId);
                $categoryQuery->whereHas('events.organizer', fn ($query) => $query->where('university_id', $universityId));
            }

            $data['adminStats'] = [
                'users' => $userQuery->count(),
                'students' => (clone $userQuery)->role('Student')->count(),
                'coordinators' => (clone $userQuery)->role('Coordinator')->count(),
                'faculty' => (clone $userQuery)->role('Faculty')->count(),
                'events' => $eventQuery->count(),
                'published_events' => (clone $eventQuery)->where('status', 'published')->count(),
                'registrations' => $registrationQuery->where('status', 'registered')->count(),
                'attendance' => $attendanceQuery->count(),
                'certificates' => $certificateQuery->count(),
                'feedback' => $feedbackQuery->count(),
                'departments' => $departmentQuery->count(),
                'categories' => $categoryQuery->count(),
            ];
        }

        return Inertia::render('dashboard', $data);
    }

    /**
     * @return array<string, int>
     */
    private function baseStats(User $user): array
    {
        return [
            'upcoming_events' => Event::query()
                ->where('status', 'published')
                ->where('start_at', '>=', now())
                ->count(),
            'my_registrations' => Registration::query()
                ->where('user_id', $user->id)
                ->where('status', 'registered')
                ->count(),
            'attended_events' => Registration::query()
                ->where('user_id', $user->id)
                ->whereNotNull('attended_at')
                ->count(),
        ];
    }
}
