<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\demande_conges;
use App\Http\Requests\Storedemande_congesRequest;
use App\Http\Requests\Updatedemande_congesRequest;
use App\Http\Resources\demande_congesR;
use App\Models\Image;
use App\Http\Requests\ImageStoreRequest;
use Symfony\Component\HttpFoundation\Response;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
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
            demande_conges::query()->orderBy('id','desc')->paginate(10)
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
    public function imageStore(ImageStoreRequest $request)
    {
        $validatedData['image'] = $request->file('image')->store('public');
        $data = Image::create($validatedData);

        return response($data, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\demande_conges  $demande_conges
     * @return \Illuminate\Http\Response
     */
    public function show(demande_conges $demande_conges,$id)
    {
        $demande_conges = demande_conges::findOrFail($id);
        return new demande_congesR($demande_conges);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Updatedemande_congesRequest  $request
     * @param  \App\Models\demande_conges  $demande_conges
     * @return \Illuminate\Http\Response
     */
    public function update(Updatedemande_congesRequest $request, demande_conges $demande_conges,$id)
    {
        $demande_conges =demande_conges::whereId($id)->first();
        $demande_conges->update([
            'conge_id'=> $request['conge_id'],
            'etat' => $request['etat'],
            'description' => $request['description'],
        ]);
        return response()->json("",204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\demande_conges  $demande_conges
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $typeConges = demande_conges::find($id);
        $typeConges->delete(); // Easy right?
        return Response("",204);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\demande_conges  $demande_conges
     * @return \Illuminate\Http\Response
     */
    public function showbyuser(demande_conges $demande_conges,$id)
    {
        $demande_conges = demande_conges::where('user_id', $id)->orderBy('id', 'desc')->paginate(10);
        return demande_congesR::collection($demande_conges);
    }

    public function countDemande()
    {
        $countall = DB::table('demande_conges')->count();
        $countv = DB::table('demande_conges')->where('etat', '=', 'Validee')->count();
        $countp = DB::table('demande_conges')->where('etat', '=', 'En Cours')->count();

        return response()->json([
            'countall' => $countall,
            'countv' => $countv,
            'countp' => $countp,
        ]);
    }
    // public function countDemandedays()
    // {
    //     $lastSevenDaysRows = DB::table('demande_conges')
    //             ->whereBetween('created_at', [now()->subDays(7), now()])
    //             ->get(['id','etat','created_at']);
    //     $lastMonthRows = DB::table('demande_conges')
    //             ->whereBetween('created_at', [now()->subMonth(), now()])
    //             ->get(['id','etat','created_at']);
    //     $lastYearRows = DB::table('demande_conges')
    //             ->whereBetween('created_at', [now()->subYear(), now()])
    //             ->get(['id','etat','created_at']);
        

    //     return response()->json([
    //         'lastd' => $lastSevenDaysRows,
    //         'lastm' => $lastMonthRows,
    //         'lastm' => $lastYearRows,
    //     ]);

    //     {
    //         "_id": {
    //           "gender": "Male",
    //           "day": 23,
    //           "month": 9,
    //           "year": 2022
    //         },
    //         "count": 120
    //       },
    // }
    public function countDemandedays($etat)
    {
        $lastSevenDaysRows = DB::table('demande_conges')
                ->whereBetween('created_at', [now()->subDays(7), now()])
                ->get(['id','etat','created_at']);
        $lastMonthRows = DB::table('demande_conges')
                ->whereBetween('created_at', [now()->subMonth(), now()])
                ->get(['id','etat','created_at']);
        $lastYearRows = DB::table('demande_conges')
                ->whereBetween('created_at', [now()->subYear(), now()])
                ->get(['id','etat','created_at']);
        

        return response()->json([
            'lastd' => $lastSevenDaysRows,
            'lastm' => $lastMonthRows,
            'lastm' => $lastYearRows,
        ]);
    }
}