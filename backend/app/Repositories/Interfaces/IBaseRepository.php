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
     * @param  mixed $columns
     * @return void
     */
    public function all($columns = array('*'));

    /**
     * @param $model
     * @return mixed
     */
    public function create($model);

    /**
     * @param array $data
     * @param $id
     * @param string $attribute
     * @return mixed
     */
    public function update(array $data, $id, $attribute = "id");

    /**
     * @param $id
     * @return mixed
     */
    public function delete($id);

    /**
     * @param $attribute
     * @param $value
     * @param array $columns
     * @return mixed
     */
    public function findBy($attribute, $value, $columns = array('*'));

}
