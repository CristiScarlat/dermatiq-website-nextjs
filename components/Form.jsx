

const Form = ({ className, submitButtonDisabled, handleSubmit }) => {

    return (
        <form className={`row g-3 ${className}`} onSubmit={handleSubmit}>
            <div className="col-md-6">
                <label htmlFor="form-name" className="form-label">Nume</label>
                <input type="text" className="form-control" id="form-name"/>
            </div>
            <div className="col-md-6">
                <label htmlFor="form-surname" className="form-label">Prenume</label>
                <input type="text" className="form-control" id="form-surname"/>
            </div>
            <div className="col-md-6">
                <label htmlFor="inputEmail" className="form-label">Email</label>
                <input type="email" className="form-control" id="inputEmail" placeholder="example@email.com"/>
            </div>
            <div className="col-md-6">
                <label htmlFor="inputPhone" className="form-label">Telefon</label>
                <input type="tel" className="form-control" id="inputPhone"/>
            </div>
            <div className="col-md-12">
                <label htmlFor="inputService" className="form-label">Serviciu</label>
                <select id="inputService" className="form-select" defaultValue={'Consult'}>
                    <option>Consult</option>
                    <option>Control</option>
                    <option>Dermatoscopie</option>
                </select>
            </div> 
            <div className="col-md-12 mt-4">
                <button type="submit" className="btn btn-primary" disabled={submitButtonDisabled}>Submit</button>
            </div>
        </form>
    )
}

export default Form;