<?php


namespace App\Repositories\Interfaces;


use Illuminate\Database\Eloquent\Model;

interface IBaseRepository
{
    /**
     * @return Model
     */
    public function makeModel();

    function model();

    /**
     * @param $attribute
     * @param $value
     * @param array $columns
     * @return mixed
     */
    public function findBy($attribute, $value, $columns = array('*'));

}
