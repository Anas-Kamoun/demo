<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TypeConges;
use App\Http\Requests\StoreTypeCongesRequest;
use App\Http\Requests\UpdateTypeCongesRequest;
use App\Http\Resources\TypeCongesR;

class TypeCongesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return TypeCongesR::collection(
            TypeConges::query()->orderBy('id','desc')->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreTypeCongesRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTypeCongesRequest $request)
    {
        $data=$request->validated();
        $Conges=TypeConges::create($data);
        return response(new TypeCongesR($Conges),201); 
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TypeConges  $typeConges
     * @return \Illuminate\Http\Response
     */
    public function show(TypeConges $typeConges)
    {
        $typeConges = TypeConges::findOrFail($id);
        return new TypeCongesR($typeConges);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTypeCongesRequest  $request
     * @param  \App\Models\TypeConges  $typeConges
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTypeCongesRequest $request, TypeConges $typeConges)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TypeConges  $typeConges
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $typeConges = TypeConges::find($id);
        $typeConges->delete(); // Easy right?
        return Response("",204);
    }
}
