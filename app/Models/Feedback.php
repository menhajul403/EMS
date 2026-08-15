<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    use HasFactory;

    protected $table = 'feedback'; // set table name explicitly since feedback is singular/plural

    protected $fillable = [
        'registration_id',
        'event_id',
        'student_id',
        'rating_overall',
        'rating_speaker',
        'rating_organization',
        'rating_venue',
        'comment',
        'suggestions',
    ];

    public function registration()
    {
        return $this->belongsTo(Registration::class);
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }
}
