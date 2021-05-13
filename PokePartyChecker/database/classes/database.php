<?php

class Database {

    const TBNAME = 'informations';

    public function __construct($dbname, $host, $user, $psword) {
        $this->dbh = new PDO(
            'mysql:dbname='.$dbname.';host='.$host.';charset=utf8;',
            $user,
            $psword,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]);
    } 

    // 一覧

    public function SqlSelectAll() {
        $query = '  SELECT *, CHAR_LENGTH(english_name) as LENGTH
                    FROM '.self::TBNAME.'
                    ORDER BY id asc, LENGTH asc';
        
        $stmt = $this->dbh->query($query);

        $result = $stmt->fetchAll();

        return $result;
    }
    
    
    public function SqlSearchByEnglishName($english_name) {
        $query = '  SELECT *, CHAR_LENGTH(english_name) as LENGTH
                    FROM '.self::TBNAME.'
                    WHERE english_name IN('.$english_name.')
                    ORDER BY id asc, LENGTH asc';
        
        $stmt = $this->dbh->query($query);
        
        $result = $stmt->fetchAll();

        return $result;
    }
}

?>