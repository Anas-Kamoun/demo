<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TypeContrat;
use App\Http\Requests\StoreTypeContratRequest;
use App\Http\Requests\UpdateTypeContratRequest;
use App\Http\Resources\TypeContratR;

class TypeContratController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return TypeContratR::collection(
            TypeContrat::query()->orderBy('id','desc')->paginate(10)
        );
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreTypeContratRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTypeContratRequest $request)
    {
        $data=$request->validated();
        $contrat=TypeContrat::create($data);
        return response(new TypeContratR($contrat),201); 
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TypeContrat  $typeContrat
     * @return \Illuminate\Http\Response
     */
    public function show(TypeContrat $typeContrat,$id)
    {
        $typeContrat = TypeContrat::findOrFail($id);
        return new TypeContratR($typeContrat);
    }


    /**
     * Update the specified resource in storage.
     * @param  int  $id
     * @param  \App\Http\Requests\UpdateTypeContratRequest  $request
     * @param  \App\Models\TypeContrat  $typeContrat
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTypeContratRequest $request, TypeContrat $typeContrat,$id)
    {
        $typeContrat =TypeContrat::whereId($id)->first();
        $typeContrat->update([
            'name' => $request['name'],
            'soldec' => $request['soldec'],
            'autorisation' => $request['autorisation'],
            'created_at' => $request['created_at'],
        ]);
        return response()->json('$data, 200, $headers');
    }

    /**
     * Remove the specified resource from storage.
     *
     * * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $typeContrat = TypeContrat::find($id);
        $typeContrat->delete(); // Easy right?
        return Response("",204);
    }
}
