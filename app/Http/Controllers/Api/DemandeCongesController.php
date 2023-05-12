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

use Carbon\Carbon;

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
            demande_conges::query()->orderBy('id', 'desc')->paginate(10)
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
        $data = $request->validated();
        $Conges = demande_conges::create($data);
        return response(new demande_congesR($Conges), 201);
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
    public function show(demande_conges $demande_conges, $id)
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
    public function update(Updatedemande_congesRequest $request, demande_conges $demande_conges, $id)
    {
        $demande_conges = demande_conges::whereId($id)->first();
        $demande_conges->update([
            'conge_id' => $request['conge_id'],
            'etat' => $request['etat'],
            'description' => $request['description'],
        ]);
        return response()->json("", 204);
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
        return Response("", 204);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\demande_conges  $demande_conges
     * @return \Illuminate\Http\Response
     */
    public function showbyuser(demande_conges $demande_conges, $id)
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

    function getCountForPast7Days($etat = null)
    {
        $response = [];
        $endDate = Carbon::now()->endOfDay();
    
        for ($i = 0; $i < 7; $i++) {
            $currentDate = $endDate->copy()->subDays($i);
            $startDate = $currentDate->copy()->startOfDay();
            $endDateOfDay = $currentDate->copy()->endOfDay();
    
            $query = DB::table('demande_conges')
                ->select(DB::raw('COUNT(*) as count'))
                ->whereBetween('created_at', [$startDate, $endDateOfDay]);
    
            if ($etat !== null) {
                $query->where('etat', $etat);
            }
    
            $result = $query->first();
    
            $response[] = [
                "_id" => [
                    "etat" => $etat,
                    "day" => $currentDate->format('d'), // Format day with leading zeros
                    "month" => $currentDate->format('m'), // Format month with leading zeros
                    "year" => (string)$currentDate->year
                ],
                "count" => $result ? $result->count : 0
            ];
        }
    
        return response()->json($response);
    }


public function getCountForLastMounth($etat = null)
{
    $response = [];
    $currentYear = Carbon::now()->year;

    for ($month = 1; $month <= 12; $month++) {
        $startDate = Carbon::create($currentYear, $month, 1, 0, 0, 0);
        $endDate = $startDate->copy()->endOfMonth();

        $query = DB::table('demande_conges')
            ->select(DB::raw('COUNT(*) as count'))
            ->whereBetween('created_at', [$startDate, $endDate]);

        if ($etat !== null) {
            $query->where('etat', $etat);
        }

        $result = $query->first();

        $response[] = [
            "_id" => [
                "etat" => $etat,
                "month" => $month,
                "year" => $currentYear
            ],
            "count" => $result ? $result->count : 0
        ];
    }

    return response()->json($response);
}



    
}