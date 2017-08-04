<?php
//imports
require_once 'class/registry.php';
require_once 'class/template.php';

//render the header
$headerTemplate = new Template('templates/header.html');
$headerTemplate->replaceVars(array('htmlTitle' => "Homer's Angels - Software"));
echo $headerTemplate->display();

//render the main home content here
$homeTemplate = new Template('templates/home.html');
echo $homeTemplate->display();

//rendering the footer
$footerTemplate = new Template('templates/footer.html');
echo $footerTemplate->display();
?>
