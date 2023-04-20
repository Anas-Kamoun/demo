<?php

namespace App\Http\Controllers;

use App\Models\type_contrat;
use App\Http\Requests\Storetype_contratRequest;
use App\Http\Requests\Updatetype_contratRequest;

class TypeContratController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Storetype_contratRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Storetype_contratRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\type_contrat  $type_contrat
     * @return \Illuminate\Http\Response
     */
    public function show(type_contrat $type_contrat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\type_contrat  $type_contrat
     * @return \Illuminate\Http\Response
     */
    public function edit(type_contrat $type_contrat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Updatetype_contratRequest  $request
     * @param  \App\Models\type_contrat  $type_contrat
     * @return \Illuminate\Http\Response
     */
    public function update(Updatetype_contratRequest $request, type_contrat $type_contrat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\type_contrat  $type_contrat
     * @return \Illuminate\Http\Response
     */
    public function destroy(type_contrat $type_contrat)
    {
        //
    }
}
