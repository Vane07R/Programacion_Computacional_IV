<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudents extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('idStudent', 15)->unique();
            $table->string('code', 3);
            $table->string('name', 170);
            $table->string('last_name', 170);
            $table->date('birth');
            $table->string('phone', 9);
            $table->string('email', 170);
            $table->string('address', 170);
            $table->string('dui', 10);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
    }
}
