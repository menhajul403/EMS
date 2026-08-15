<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('department_id')->nullable()->after('university_id')->constrained('departments')->nullOnDelete();
        });

        Schema::table('events', function (Blueprint $table) {
            $table->foreignId('department_id')->nullable()->after('category_id')->constrained('departments')->nullOnDelete();
            $table->foreignId('club_id')->nullable()->after('department_id')->constrained('clubs')->nullOnDelete();
            $table->text('rejection_reason')->nullable()->after('status');
        });
    }

    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropForeign(['department_id']);
            $table->dropForeign(['club_id']);
            $table->dropColumn(['department_id', 'club_id', 'rejection_reason']);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['department_id']);
            $table->dropColumn('department_id');
        });
    }
};
