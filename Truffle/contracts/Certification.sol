pragma solidity 0.8.13;

contract Certification {
    struct Diplome {
        string intitule;
        string etablissement;
        string etablissementHash;
        string documentHash;
        string documentLink;
        string nom;
        string prenom;
        string etudiantHash;
    }
    mapping(string => Diplome) private Diplomes;
    string[] private diplomes_keys;

    function NouveauDiplome(
        string memory _intitule,
        string memory _etablissement,
        string memory _etablissementHash,
        string memory _documentHash,
        string memory _documentLink,
        string memory _nom,
        string memory _prenom,
        string memory _etudiantHash
    ) public {
        diplomes_keys.push(_etudiantHash);
        Diplomes[_etudiantHash] = Diplome({
            intitule: _intitule,
            etablissement: _etablissement,
            etablissementHash: _etablissementHash,
            documentHash: _documentHash,
            documentLink: _documentLink,
            nom: _nom,
            prenom: _prenom,
            etudiantHash: _etudiantHash
        });
        emit EventCertification(
            _intitule,
            _etablissement,
            _nom,
            _prenom,
            _documentLink
        );
    }

    event EventCertification(
        string Intitule,
        string Etablissement,
        string Nom,
        string Prenom,
        string Document
    );

    function ObtenirDiplome(string memory _hash)
        public
        view
        returns (Diplome memory)
    {
        return Diplomes[_hash];
    }

    function NombreTotalDeDiplome() public view returns (uint256) {
        return diplomes_keys.length;
    }

    function NombreDeDiplomeParEtablissement(string memory _etablissementHash)
        public
        view
        returns (uint256)
    {
        uint256 nombre = 0;
        for (uint256 i = 0; i < diplomes_keys.length; i++) {
            if (
                keccak256(
                    bytes(Diplomes[diplomes_keys[i]].etablissementHash)
                ) == keccak256(bytes(_etablissementHash))
            ) {
                nombre++;
            }
        }

        return nombre;
    }
}
