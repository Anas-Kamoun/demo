<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class demande_congesR extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'=>$this->id,
            'user_id'=>$this->user_id,
            'conge_id'=>$this->conge_id,
            'type'=>$this->type,
            'start_date'=>$this->start_date,
            'end_date'=>$this->end_date,
            'description'=>$this->description,
            'file'=>$this->file,
            'created_at'=>$this->created_at->format('Y-m-d H:i:s')
        ];
    }
}
