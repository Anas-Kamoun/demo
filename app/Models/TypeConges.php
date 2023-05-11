<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeConges extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'contrat_id'
    ];

    public function contrat()
    {
        return $this->belongsToMany(TypeContrat::class, 'conges_contrats', 'conge_id', 'contrat_id');
    }   
}
