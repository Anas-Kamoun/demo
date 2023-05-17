<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TypeConges;
use App\Models\TypeContrat;
use App\Http\Requests\StoreTypeCongesRequest;
use App\Http\Requests\UpdateTypeCongesRequest;
use App\Http\Resources\TypeCongesR;

use Illuminate\Support\Facades\DB;
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
        $TypeConges = new TypeConges();
        $TypeConges->name=$data['name'];
        $TypeConges->save();
        $contractIds = $request['contrat_id'];
        $TypeConges->contrat()->attach($contractIds);


        return response()->json(['message' => 'type created and attached to contrat successfully']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TypeConges  $typeConges
     * @return \Illuminate\Http\Response
     */
    public function show(TypeConges $typeConges,$id)
    {
        $typeConges = TypeConges::findOrFail($id);
        return new TypeCongesR($typeConges);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TypeConges  $typeConges
     * @return \Illuminate\Http\Response
     */

    public function getcongebycontrat(TypeConges $typeConges,$id)
    {
        $contract = TypeContrat::find($id);
        $conges = $contract->conge;
        $congeNames = [];
        foreach ($conges as $conge) {
            $congeId = $conge->id;
            $name = DB::table('type_conges')->where('id', '=', $congeId)->get();
            $congeNames[] = $name[0];
        }
        return response()->json($congeNames);    
        // return new TypeCongesR($typeConges);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTypeCongesRequest  $request
     * @param  \App\Models\TypeConges  $typeConges
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTypeCongesRequest $request, TypeConges $typeConges,$id)
    {
        // $TypeConges =TypeConges::whereId($id)->first();
        // $TypeConges->update([
        //     'name' => $request['name'],
        //     'contrat_id' => $request['contrat_id'],
        //     'created_at' => $request['created_at'],
        // ]);
        // return response()->json("",204);
        $TypeConges =TypeConges::whereId($id)->first();
        $data=$request->validated();
        $TypeConges->name=$data['name'];
        $TypeConges->save();
        $contractIds = $request['contrat_id'];
        $TypeConges->contrat()->sync($contractIds);


        return response()->json(['message' => 'Updated !!']);

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
