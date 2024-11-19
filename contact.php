<?php
$FirstName = $_POST['firstName'];
$LastName = $_POST['lastName'];
$Email = $_POST['email'];
$Mobile = $_POST['mobile'];
$Message = $_POST['message'];

if (!empty($firstName) ||  !empty($Email) || !empty($Message)) {
    $host = "localhost";
    $dbName = "root";
    $dbname = "myproject";

    $conn = new mysqli($host, $dbName, '', $dbname);


    if (mysqli_connect_errno ()) {
        die('connnect eror('.mysqli_connect_errno().')'. mysqli_connect_error());
    } else {
        $SELECT = "SELECT Email from contact where Email = ? Limit 1 ";
        $INSERT = "INSERT INTO contact (FirstName, LastName, Email, Mobile, Message) VALUES (?, ?, ?, ?, ?)";

        $stmt = $conn->prepare($SELECT);
        $stmt->bind_param("s",$Email);
        $stmt->execute();
        $stmt->bind_result($Email);
        $stmt->store_result();
        $rnum = $stmt->num_rows;

        if($rnum==0) {
            $stmt->close();

            $stmt = $conn->prepare($INSERT);
            $stmt->bind_param("sssss", $FirstName, $LastName, $Email, $Mobile, $Message);
            $stmt->execute();
            echo "New record inserted sucessfully";
        } else{
            echo "someone already contact using this email" ;
        }
        $stmt->close();
        $conn->close();
    }
}
else{
    echo "all filed are required";
    die();
}
?>