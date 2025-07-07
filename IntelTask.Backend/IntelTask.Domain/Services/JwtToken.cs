using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace IntelTask.Domain.Services
{
    internal class JwtToken
    {
        private string? issuer;
        private string? audience;
        private Claim[] claims;
        private DateTime expires;
        private SigningCredentials signingCredentials;

        public JwtToken(string? issuer, string? audience, Claim[] claims, DateTime expires, SigningCredentials signingCredentials)
        {
            this.issuer = issuer;
            this.audience = audience;
            this.claims = claims;
            this.expires = expires;
            this.signingCredentials = signingCredentials;
        }
    }
}