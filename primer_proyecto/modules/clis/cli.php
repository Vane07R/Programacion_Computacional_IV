<?php
include('../../private/db/config.php');

extract($_REQUEST);

$class_client = new clis($conex);
$client = isset($client) ? $client: '[]';
print_r($class_client->$action($client));

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
    public function?() {
        if (empty($this->data['cliCode']) || empty($this->data['cliName']) || empty($this->data['cliAddress']) || empty($this->data['cliPhone']) || empty($this->data['cliDNI'])) {
            $this->result['msg'] = 'Por favor complete todos los campos';
        }
        return $this->record_data();
    }
    private function record_data() {
        if($this->result['msg'] == 'Ready') {
            if($this->data['action'] == 'new') {
                $this->db->query('INSERT INTO db_sistema_a2.clients (cliCode, cliName, cliAddress, cliPhone, cliDNI) VALUES (?, ?, ?, ?, ?)', $this->data['cliCode'], $this->data['cliName'], $this->data['cliAddress'], $this->data['cliPhone'], $this->data['cliDNI']);
                return $this->db->get_last_id();
            } else if ($this->data['action'] == 'edit') {
                $this->db->query('UPDATE db_sistema_a2.clients SET cliCode = ?, cliName = ?, cliAddress = ?, cliPhone = ?, cliDNI = ? WHERE idCli = ?', $this->data['cliCode'], $this->data['cliName'], $this->data['cliAddress'], $this->data['cliPhone'], $this->data['cliDNI'], $this->data['idCli']);
                return $this->db->get_result();
            } else if ($this->data['action'] == 'delete') {
                $this->db->query('DELETE FROM db_sistema_a2.clients WHERE idCli = ?', $this->data['idCli']);
                return $this->db->get_result();
            }
        } else {
            return $this->result['msg'];
        }
    }
}
?>