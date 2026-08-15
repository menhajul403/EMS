<?php

namespace App\Models;

use Database\Factories\EventFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    /** @use HasFactory<EventFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'short_description',
        'description',
        'category_id',
        'venue_id',
        'organizer_id',
        'faculty_advisor_id',
        'department_id',
        'club_id',
        'start_at',
        'end_at',
        'registration_deadline',
        'capacity',
        'status',
        'rejection_reason',
        'banner',
    ];

    protected $casts = [
        'start_at' => 'datetime',
        'end_at' => 'datetime',
        'registration_deadline' => 'datetime',
    ];

    public function category()
    {
        return $this->belongsTo(EventCategory::class, 'category_id');
    }

    public function venue()
    {
        return $this->belongsTo(Venue::class);
    }

    public function organizer()
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }

    public function facultyAdvisor()
    {
        return $this->belongsTo(User::class, 'faculty_advisor_id');
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function club()
    {
        return $this->belongsTo(Club::class);
    }

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function feedbacks()
    {
        return $this->hasMany(Feedback::class);
    }

    public function galleries()
    {
        return $this->hasMany(Gallery::class);
    }
}
