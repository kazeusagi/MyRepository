<script type="text/javascript">
    var post_data = <?php echo json_encode($_POST); ?>;

</script>
<!DOCTYPE html>
<html lang="ja">

<head>
    <link rel="stylesheet" href="css/import_table.css">
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <script type="text/javascript" src="js/import_table.js"></script>
</head>

<body>
    <div class="arrow"></div>
    <nav>
        <ul>
            <li><input type="button" value="結果の編集" onclick="edit_mode()"></li>
            <li><a class="button" href="#popupImage" onclick="createTableImage()">画像の生成</a></li>
        </ul>
    </nav>
    <table id="table">
    </table>
    <div id="popupImage" class="overlay">
        <div class="popup">
            <a class="close" href="#">&times;</a>
            <div class="content">
            </div>
        </div>
    </div>
</body>

</html>
