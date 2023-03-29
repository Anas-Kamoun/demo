<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\demande_conges;
use App\Http\Requests\Storedemande_congesRequest;
use App\Http\Requests\Updatedemande_congesRequest;
use App\Http\Resources\demande_congesR;

class DemandeCongesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return demande_congesR::collection(
            demande_congesR::query()->orderBy('id','desc')->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Storedemande_congesRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Storedemande_congesRequest $request)
    {
        $data=$request->validated();
        $Conges=demande_conges::create($data);
        return response(new demande_congesR($Conges),201); 
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\demande_conges  $demande_conges
     * @return \Illuminate\Http\Response
     */
    public function show(demande_conges $demande_conges)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\demande_conges  $demande_conges
     * @return \Illuminate\Http\Response
     */
    public function edit(demande_conges $demande_conges)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Updatedemande_congesRequest  $request
     * @param  \App\Models\demande_conges  $demande_conges
     * @return \Illuminate\Http\Response
     */
    public function update(Updatedemande_congesRequest $request, demande_conges $demande_conges)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\demande_conges  $demande_conges
     * @return \Illuminate\Http\Response
     */
    public function destroy(demande_conges $demande_conges)
    {
        //
    }
}