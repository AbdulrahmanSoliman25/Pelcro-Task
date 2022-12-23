<?php

namespace App\Notifications;

use App\Jobs\WelcomeMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class Notifications extends Notification
{
    use Queueable;

    public static $byEmail;
    public static $email;

    static public function through($via)
    {
        self::$byEmail = in_array('email', $via);

        return new self;
    }

    public function toMail($email)
    {
        self::$email = $email;

        return new self;
    }


    public function send($description, $title = null)
    {
        if (self::$byEmail && self::$email) {
            WelcomeMail::dispatch(self::$email, $title, $description);
        }
    }
}
