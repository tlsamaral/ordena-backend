interface UserEmailProps {
  email: string
  name: string
  password: string
}
export function createNewUserMessage({
  email,
  name,
  password,
}: UserEmailProps) {
  return `<p>
                  <strong>Olá ${name},</strong>
              </p>
              <p>
                  <em>Seja bem-vindo ao SnapFood!</em> Estamos muito felizes em tê-lo conosco.
              </p>
              <p>
                  Seu cadastro foi <strong>realizado com sucesso</strong> em nosso sistema. Aqui estão os seus dados de acesso:
              </p>
              <ul>
                  <li><strong>Nome de Usuário:</strong> ${name}</li>
                  <li><strong>Email:</strong> ${email}</li>
                  <li><strong>Senha:</strong> ${password}</li>
              </ul>
              <p>
                  <em>Por motivos de segurança, recomendamos que você <strong>altere sua senha</strong> assim que acessar sua conta pela primeira vez.</em>
              </p>
              <p>
                  Para acessar o sistema SnapFood e começar a gerenciar seus pedidos e preferências, clique no link abaixo:
              </p>
              <p>
                  <a href="${process.env.BASE_URL}">Acessar o SnapFood</a>
              </p>
              <p>
                  Caso tenha dúvidas ou precise de assistência, entre em contato conosco pelo email <a href="mailto:[Email de Contato]">[Email de Contato]</a>.
              </p>
              <p>
                  Obrigado por escolher o SnapFood!
              </p>
              <p>
                  <em>Atenciosamente,</em><br>
                  <strong>Equipe SnapFood</strong>
              </p>`
}
