<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\JobController;
use App\Http\Controllers\Api\JobApplicationController;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Jobs Routes
    Route::apiResource('jobs', JobController::class);
    
    // Job Applications Routes
    Route::apiResource('job-applications', JobApplicationController::class);
    Route::post('job-applications/{id}/accept', [JobApplicationController::class, 'accept']);
    Route::post('job-applications/{id}/reject', [JobApplicationController::class, 'reject']);
    
    // Chat Routes
    Route::apiResource('chats', ChatController::class);
    Route::get('chats/user/{userId}', [ChatController::class, 'getUserChats']);
    Route::post('chats/{id}/mark-as-read', [ChatController::class, 'markAsRead']);
    
    // Notifications Routes
    Route::apiResource('notifications', NotificationController::class);
    Route::post('notifications/{id}/mark-as-read', [NotificationController::class, 'markAsRead']);
    Route::get('notifications/unread/count', [NotificationController::class, 'unreadCount']);
});
