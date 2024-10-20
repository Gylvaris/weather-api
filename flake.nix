{
  description = "Weather-API development environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = {
    self,
    nixpkgs,
    ...
  }: let
    system = "x86_64-linux";
  in {
    devShells."${system}".default = let
      pkgs = import nixpkgs {
        inherit system;
      };
    in
      pkgs.mkShell {
        packages = with pkgs; [
          nodejs_22
          nodePackages.pnpm
          zsh
        ];

        shellHook = ''
          echo "node `${pkgs.nodejs}/bin/node --version`"
          exec zsh
        '';
      };
  };
}
