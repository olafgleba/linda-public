<?php
	foreach($pages->find('template=single') as $directory){
		if ($page->name === $directory->name) {
			echo "	<li class='current'>{$directory->title}</li>\n\t\t\t";
		} else {
			echo "	<li><a href='{$directory->url}'>{$directory->title}</a></li>\n\t\t\t";
		}
	}
?>
