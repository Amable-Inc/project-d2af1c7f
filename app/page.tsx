'use client';

import { useState } from 'react';
import { Plus, Trash2, TrendingUp, Activity, Award } from 'lucide-react';

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
  const percentComplete = Math.min(100, Math.round(progress));

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

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Nutrition Tracker</h1>
              <p className="mt-1 text-sm text-slate-500">{today}</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">
              <Award className="h-5 w-5 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Daily Goal: {dailyGoal} cal</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Stats Overview */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          {/* Consumed */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Consumed</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{totalCalories}</p>
                <p className="mt-1 text-sm text-slate-500">calories</p>
              </div>
              <div className="rounded-full bg-blue-50 p-3">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Remaining */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Remaining</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{remaining}</p>
                <p className="mt-1 text-sm text-slate-500">calories</p>
              </div>
              <div className="rounded-full bg-emerald-50 p-3">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Progress</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{percentComplete}%</p>
                <p className="mt-1 text-sm text-slate-500">of daily goal</p>
              </div>
              <div className="rounded-full bg-violet-50 p-3">
                <Award className="h-6 w-6 text-violet-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar Card */}
        <div className="mb-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Daily Goal Progress</h2>
            <span className="text-sm text-slate-500">{totalCalories} / {dailyGoal} cal</span>
          </div>
          <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full transition-all duration-700 ease-out ${
                progress > 100 
                  ? 'bg-gradient-to-r from-red-500 to-red-600' 
                  : progress > 80 
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600' 
                  : 'bg-gradient-to-r from-blue-500 to-blue-600'
              }`}
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>
          {progress > 100 && (
            <p className="mt-2 text-sm text-red-600">You've exceeded your daily goal by {totalCalories - dailyGoal} calories</p>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Add Food Form */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">Log Food</h2>
              <form onSubmit={addFood} className="space-y-4">
                <div>
                  <label htmlFor="foodName" className="block text-sm font-medium text-slate-700 mb-2">
                    Food Name
                  </label>
                  <input
                    id="foodName"
                    type="text"
                    placeholder="e.g., Chicken Salad"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    className="w-full rounded-md border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label htmlFor="calories" className="block text-sm font-medium text-slate-700 mb-2">
                    Calories
                  </label>
                  <input
                    id="calories"
                    type="number"
                    placeholder="e.g., 350"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    className="w-full rounded-md border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Plus className="h-5 w-5" />
                  Add Food
                </button>
              </form>
            </div>
          </div>

          {/* Food List */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-900">Today's Log</h2>
                <p className="text-sm text-slate-500">{foods.length} item{foods.length !== 1 ? 's' : ''} logged</p>
              </div>
              <div className="p-6">
                {foods.length === 0 ? (
                  <div className="py-16 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                      <Activity className="h-8 w-8 text-slate-400" />
                    </div>
                    <p className="text-slate-900 font-medium">No entries yet</p>
                    <p className="mt-1 text-sm text-slate-500">Start logging your meals to track your nutrition</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {foods.map((food) => (
                      <div
                        key={food.id}
                        className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50/50 p-4 transition-colors hover:bg-slate-50"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-900 truncate">{food.name}</p>
                          <p className="text-sm text-slate-500">{food.time}</p>
                        </div>
                        <div className="flex items-center gap-4 ml-4">
                          <div className="text-right">
                            <p className="font-semibold text-slate-900">{food.calories}</p>
                            <p className="text-xs text-slate-500">calories</p>
                          </div>
                          <button
                            onClick={() => deleteFood(food.id)}
                            className="rounded-md p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                            aria-label="Delete food entry"
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
        </div>
      </div>
    </div>
  );
}
