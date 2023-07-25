import { useState } from "react";
import { Button, Modal } from "react-bootstrap"
import { fetchAddNewUser } from '../Service/UserService'
import { toast } from "react-toastify";


const ModalAddNew = (props) => {
    const { show, handleClose, handleUpdateTable } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const handleSaveUser = async () => {
        let res = await fetchAddNewUser(name, job)

        if (res && res.id) {
            handleClose();
            setName('');
            setJob('');
            toast.success("Success");
            handleUpdateTable({ first_name: name, id: res.id })

        } else {
            //error
            toast.error("failure")
        }
    }

    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Name</label>
                            <input type="text" class="form-control" id="exampleInputEmail1"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />

                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Job</label>
                            <input type="text" class="form-control" id="exampleInputPassword1"
                                value={job}
                                onChange={(event) => setJob(event.target.value)}
                            />
                        </div>


                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddNew;