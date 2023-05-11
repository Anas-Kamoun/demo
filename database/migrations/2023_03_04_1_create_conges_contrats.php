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
        Schema::create('conges_contrats', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('contrat_id')->unsigned();
            $table->unsignedBigInteger('conge_id')->unsigned();
            $table->timestamps();
            $table->foreign('contrat_id')->references('id')->on('type_contrats')->onDelete('cascade');;
            $table->foreign('conge_id')->references('id')->on('type_conges')->onDelete('cascade');;
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('conges_contrats');
    }
};
