<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class demande_conges extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'conge_id',
        'type',
        'autorisation',
        'etat',
        'start_autorisation',
        'start_date',
        'end_date',
        'description',
        'file'
    ];
}
