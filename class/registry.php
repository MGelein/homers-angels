<?php

/**
 * Fixes the string by stripping slashes, tags and htmlentities
 * @param unknown $string
 * @return string
 */
function fix_string($string){
	return stripslashes(htmlentities(strip_tags($string)));
}

/**
 * Retrieves the provided value from the $_POST array, and sanatizes
 * it before returning
 * @param unknown $varname
 */
function get_post($varname){
	return fix_string($_POST[$varname]);
}
