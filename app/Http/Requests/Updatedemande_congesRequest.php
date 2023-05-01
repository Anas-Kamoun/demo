<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Updatedemande_congesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'user_id'=>'exists:App\Models\User,id',
            'type'=>'required|string',
            'conge_id'=>'nullable|required_if:type,Congee|exists:App\Models\TypeConges,id',
            'autorisation'=>'nullable|required_if:type,autorisation',
            'start_autorisation'=>'nullable|required_if:type,autorisation',
            'start_date'=>'nullable|required_if:type,Congee|date',
            'end_date'=>'nullable|required_if:type,Congee|date',
            'description'=>'nullable|string',
            'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
            'file'=>'nullable|string',
        ];
    }
}
