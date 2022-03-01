<?php
include('../../private/db/db.php');

extract($_REQUEST);

class clis {
    private $data = [], $db;

    public $result = ['msg'=>'Ready'];
    public function cli($db = '') {
        $this->db = $db;
    }
    public function get_data($cli = '') {
        $this->data = json_decode($cli, true);
    }
    public function get_data() {
        return $this->data;
    }
    public function validate() {
        if (empty($this->data['cliCode']) || empty($this->data['cliName']) || empty($this->data['cliAddress']) || empty($this->data['cliPhone']) || empty($this->data['cliDNI'])) {
            $this->result['msg'] = 'Por favor complete todos los campos';
        }
    }
}
?>