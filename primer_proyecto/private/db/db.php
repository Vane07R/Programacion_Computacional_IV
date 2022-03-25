<?php
class db {
    private $conex, $result;

    public function __construct($server, $user, $pass,) {
        $this->conex = new PDO($server, $user, $pass, array(PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)) or die("Error en la conexión");
        return $this->conex;
    }
    public function query($sql) {
        try {
            $params = func_get_args();
            array_shift($params);
            print_r($params);
            print_r($sql);
            $this->ready = $this->conex->prepare($sql);
            $this->result = $this->ready->execute($params);
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }
    public function get_data() {
        return $this->ready->fetchAll(PDO::FETCH_ASSOC);
    }
    public function get_result() {
        return $this->result;
    }
    public function get_last_id() {
        return $this->conex->lastInsertId();
    }
}
?>