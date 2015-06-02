<?php

function wordLimiter(HookEvent $event){
    $field = $event->arguments[0]; // first argument
    $limit = $event->arguments[1];
    $endstr = isset($event->arguments[2]) ? $event->arguments[2] : ' …';
    $page = $event->object; // the page
    $str = $page->get($field);

    $str = strip_tags($str);
    if(strlen($str) <= $limit) return;
    $out = substr($str, 0, $limit);
    $pos = strrpos($out, " ");
    if ($pos>0) {
        $out = substr($out, 0, $pos);
    }
    return $event->return = $out .= $endstr;
}

// this will add a custom method to Page object
wire()->addHook("Page::wordLimiter", null, "wordLimiter");

// use it like this
// $page->wordLimiter("<field>", 50)


?>