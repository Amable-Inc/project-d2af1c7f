'use client';

import { useState } from 'react';
import { Plus, Trash2, Target, Flame } from 'lucide-react';

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  time: string;
}

export default function CalorieTracker() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [dailyGoal] = useState(2000);

  const totalCalories = foods.reduce((sum, food) => sum + food.calories, 0);
  const progress = (totalCalories / dailyGoal) * 100;
  const remaining = Math.max(0, dailyGoal - totalCalories);

  const addFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (foodName.trim() && calories && Number(calories) > 0) {
      const newFood: FoodItem = {
        id: Date.now().toString(),
        name: foodName.trim(),
        calories: Number(calories),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setFoods([newFood, ...foods]);
      setFoodName('');
      setCalories('');
    }
  };

  const deleteFood = (id: string) => {
    setFoods(foods.filter(food => food.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="mx-auto max-w-4xl p-6 pt-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <Flame className="h-10 w-10 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-900">CalTrack</h1>
          </div>
          <p className="text-gray-600">Track your daily calorie intake</p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-orange-100 p-3">
                <Flame className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Consumed</p>
                <p className="text-2xl font-bold text-gray-900">{totalCalories}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-3">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Daily Goal</p>
                <p className="text-2xl font-bold text-gray-900">{dailyGoal}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-3">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Remaining</p>
                <p className="text-2xl font-bold text-gray-900">{remaining}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Daily Progress</span>
            <span className="text-sm font-semibold text-gray-900">{Math.min(100, Math.round(progress))}%</span>
          </div>
          <div className="h-4 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                progress > 100 ? 'bg-red-500' : progress > 80 ? 'bg-orange-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>
        </div>

        {/* Add Food Form */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Add Food</h2>
          <form onSubmit={addFood} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Food name"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
            <input
              type="number"
              placeholder="Calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 sm:w-32"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              <Plus className="h-5 w-5" />
              Add
            </button>
          </form>
        </div>

        {/* Food List */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Today's Meals</h2>
          {foods.length === 0 ? (
            <div className="py-12 text-center">
              <Flame className="mx-auto mb-3 h-12 w-12 text-gray-300" />
              <p className="text-gray-500">No foods logged yet. Start tracking!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {foods.map((food) => (
                <div
                  key={food.id}
                  className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-4 transition-colors hover:bg-gray-100"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{food.name}</p>
                    <p className="text-sm text-gray-500">{food.time}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-orange-600">{food.calories} cal</span>
                    <button
                      onClick={() => deleteFood(food.id)}
                      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
