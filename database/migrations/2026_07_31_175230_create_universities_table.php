<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('universities', function (Blueprint $table) {

            $table->id();

            $table->string('name');
            $table->string('short_name')->nullable();

            $table->string('slug')->unique();

            $table->string('email')->nullable();

            $table->string('phone',30)->nullable();

            $table->string('website')->nullable();

            $table->string('logo')->nullable();

            $table->string('cover_image')->nullable();

            $table->text('address')->nullable();

            $table->string('city')->nullable();

            $table->string('country')->default('Bangladesh');

            $table->string('timezone')->default('Asia/Dhaka');

            $table->enum('status',[
                'active',
                'inactive',
                'suspended'
            ])->default('active');

            $table->boolean('is_verified')->default(false);

            $table->timestamp('verified_at')->nullable();

            $table->timestamps();

            $table->softDeletes();

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('universities');
    }
};