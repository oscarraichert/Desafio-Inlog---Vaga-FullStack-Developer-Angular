using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inlog.Desafio.Backend.Domain.Shared
{
    internal interface IRequestModel<T>
    {
        public T ToModel();
    }
}
