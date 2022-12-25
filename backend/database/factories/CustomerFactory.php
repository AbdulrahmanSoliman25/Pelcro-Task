<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\=Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "first_name" =>  $this->faker->name(),
            "last_name" => $this->faker->name(),
            "email" => $this->faker->email(),
            "username" => $this->faker->userName(),
            "salary" => $this->faker->numberBetween(1000, 10000),
            "status" => $this->faker->numberBetween(1, 3),
        ];
    }
}
