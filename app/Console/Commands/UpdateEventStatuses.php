<?php

namespace App\Console\Commands;

use App\Models\Event;
use Illuminate\Console\Command;

class UpdateEventStatuses extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-event-statuses';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update published events as they start and finish';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $now = now();
        $started = Event::query()
            ->where('status', 'published')
            ->whereNotNull('start_at')
            ->where('start_at', '<=', $now)
            ->where(function ($query) use ($now) {
                $query->whereNull('end_at')->orWhere('end_at', '>', $now);
            })
            ->update(['status' => 'ongoing']);

        $completed = Event::query()
            ->where('status', 'ongoing')
            ->whereNotNull('end_at')
            ->where('end_at', '<=', $now)
            ->update(['status' => 'completed']);

        $this->info("Started: {$started}; completed: {$completed}.");

        return self::SUCCESS;
    }
}
