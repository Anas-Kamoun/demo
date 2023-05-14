<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Poste;
use App\Http\Requests\StorePosteRequest;
use App\Http\Requests\UpdatePosteRequest;
use App\Http\Resources\PosteResource;

use Illuminate\Support\Facades\DB;

class PosteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return PosteResource::collection(
            Poste::query()->orderBy('id','desc')->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorePosteRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePosteRequest $request)
    {
        $data=$request->validated();
        $poste=Poste::create($data);
        return response(new PosteResource($poste),201); 
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Poste  $poste
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $poste = Poste::findOrFail($id);
        return new PosteResource($poste);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePosteRequest  $request
     * @param  \App\Models\Poste  $poste
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePosteRequest $request,$id)
    {
        $poste =Poste::whereId($id)->first();
        $poste->update([
            'name' => $request['name'],
            'created_at' => $request['created_at'],
        ]);
        return response()->json("",204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Poste  $poste
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $poste = Poste::find($id);
        $poste->delete(); // Easy right?
        return Response("",204);    }

        public function countPost()
    {
        $count = DB::table('postes')->count();
        return response()->json(['count' => $count]);
    }
}
