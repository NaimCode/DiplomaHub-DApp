pragma solidity 0.8.13;

contract Certification {
    struct Diplome {
        string etablissement;
        string etablissementHash;
        string documentHash;
        string documentLink;
        string nom;
        string prenom;
        string etudiantHash;
    }
    mapping(string => Diplome) private Diplomes;

    function NouveauDiplome(
        string memory _etablissement,
        string memory _etablissementHash,
        string memory _documentHash,
        string memory _documentLink,
        string memory _nom,
          string memory _prenom,
        string memory _etudiantHash
    ) public {
        Diplomes[_etudiantHash] = Diplome({
            etablissement: _etablissement,
            etablissementHash: _etablissementHash,
            documentHash: _documentHash,
            documentLink: _documentLink,
           nom:_nom,
           prenom:_prenom,
            etudiantHash: _etudiantHash
        });
        emit EventCertification(_etablissement, _nom, _prenom, _documentLink);
    }
 
    event EventCertification(string Etablissement,string Nom, string Prenom, string Document);
    
    function ObtenirDiplome(string memory _hash)
        public
        view
        returns (Diplome memory)
    {
        return Diplomes[_hash];
    }
}
