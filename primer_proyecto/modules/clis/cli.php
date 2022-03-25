<?php
include('../../private/db/config.php');

extract($_REQUEST);

$class_client = new cli($conex);
$cli = isset($cli) ? $cli: '[]';
print_r(json_encode($class_client->$action($cli)));

class cli {
    private $data = [], $db;

    public $result = ['msg'=>'Ready'];
    public function __construct($db = '') {
        $this->db = $db;
    }
    public function get_data($cli = '') {
        $this->data = json_decode($cli, true);
        return $this->validate_data();
    }
    public function validate_data() {
        if (empty(trim($this->data['idCli'])) || empty(trim($this->data['code'])) || empty(trim($this->data['name'])) || empty(trim($this->data['address'])) || empty(trim($this->data['phone'])) || empty(trim($this->data['dui']))) {
            $this->result['msg'] = 'Por favor complete todos los campos';
        }
        return $this->record_data();
    }
    private function record_data() {
        if($this->result['msg'] == 'Ready') {
            if($this->data['action'] == 0) {
                print_r($this->db);
                $this->db->query('INSERT INTO db_sistema_a2.clients (idCli, cliCode, cliName, cliAddress, cliPhone, cliDNI) VALUES (?, ?, ?, ?, ?, ?)', $this->data['idCli'], $this->data['code'], $this->data['name'], $this->data['address'], $this->data['phone'], $this->data['dui']);
                return $this->db->get_last_id();
            } else if ($this->data['action'] == 1) {
                $this->db->query('UPDATE db_sistema_a2.clients SET cliCode = ?, cliName = ?, cliAddress = ?, cliPhone = ?, cliDNI = ? WHERE idCli = ?', $this->data['code'], $this->data['name'], $this->data['address'], $this->data['phone'], $this->data['dui'], $this->data['idCli']);
                return $this->db->get_result();
            } else if ($this->data['action'] == 2) {
                $this->db->query('DELETE FROM db_sistema_a2.clients WHERE idCli = ?', $this->data['idCli']);
                return $this->db->get_result();
            }
        } else {
            return $this->result['msg'];
        }
    }
    public function get_records() {
        $this->db->query('SELECT * FROM db_sistema_a2.clients');
        print_r(json_encode($this->db->get_data()));
        return json_encode($this->db->get_data());
    }
}
?>