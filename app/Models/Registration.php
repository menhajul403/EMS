<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id','user_id','status','attended_at','qr_code','qr_expires_at'
    ];

    protected $casts = [
        'attended_at' => 'datetime',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function attendance()
    {
        return $this->hasOne(Attendance::class);
    }

    public function feedback()
    {
        return $this->hasOne(Feedback::class);
    }

    public function certificate()
    {
        return $this->hasOne(Certificate::class);
    }
}
