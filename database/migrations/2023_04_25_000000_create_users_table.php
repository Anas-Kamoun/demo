<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->tinyInteger('solde')->nullable();
            $table->time('autorisation')->nullable();
            $table->string('role')->nullable();
            $table->integer('tel')->nullable();
            $table->unsignedBigInteger('contrat_id')->nullable();
            $table->foreign('contrat_id')
                 ->references('id')
                 ->on('type_contrats');
            $table->unsignedBigInteger('poste_id')->nullable();
            $table->foreign('poste_id')
                 ->references('id')
                 ->on('postes');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
};
