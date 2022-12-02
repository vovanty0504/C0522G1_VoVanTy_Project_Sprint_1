package projectbackend.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import projectbackend.common.IEmailService;
import projectbackend.dto.decentralization.IUserEmailDto;
import projectbackend.jwt.JwtTokenUtil;
import projectbackend.model.customer.Customer;
import projectbackend.model.decentralization.Role;
import projectbackend.model.decentralization.SocialResponse;
import projectbackend.model.decentralization.User;
import projectbackend.payload.reponse.MessageResponse;
import projectbackend.payload.request.LoginRequest;
import projectbackend.payload.request.LoginResponse;
import projectbackend.payload.request.ResetPassRequest;
import projectbackend.service.customer.impl.CustomerService;
import projectbackend.service.decentralization.IRoleService;
import projectbackend.service.decentralization.impl.MyUserDetailService;
import projectbackend.service.decentralization.impl.MyUserDetails;
import projectbackend.service.decentralization.impl.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
@CrossOrigin("*")
@RequestMapping("/api/public")
public class SecurityController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private IEmailService iEmailService;

    @Autowired
    private UserService userService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private IRoleService roleService;


    @Autowired
    private MyUserDetailService myUserDetailService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtTokenUtil.generateJwtToken(loginRequest.getUsername());
        MyUserDetails myUserDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<String> roles = myUserDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        return ResponseEntity.ok(
                new LoginResponse(
                        jwt,
                        myUserDetails.getUsername(),
                        roles));
    }

    @GetMapping("/forgot-password")
    public ResponseEntity<MessageResponse> forgotPassword(@RequestParam String email) {
        Optional<IUserEmailDto> iUserEmailDto = userService.findByEmail(email);
        if (!iUserEmailDto.isPresent()) {
            return new ResponseEntity<>(new MessageResponse("Email không tồn tại trong hệ thống"), HttpStatus.NOT_FOUND);
        }
        IUserEmailDto userEmailDto = iUserEmailDto.get();
        String token = this.jwtTokenUtil.generateJwtToken(userEmailDto.getUsername());
        String resetPasswordLink = "http://localhost:4200/confirm-reset-password/" + token;
        if (iEmailService.sendEmail(email, resetPasswordLink)) {
            return new ResponseEntity<>(new MessageResponse("Gửi email thành công"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new MessageResponse("Gửi email thất bại"), HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/comfirm-reset-password")
    public ResponseEntity<MessageResponse> resetPassword(@RequestBody ResetPassRequest request) {
        String username = jwtTokenUtil.getUsernameFromJwtToken(request.getToken());
        Optional<IUserEmailDto> iUserEmailDto = userService.findByUsernameDto(username);
        if (!iUserEmailDto.isPresent()) {
            return new ResponseEntity<>(new MessageResponse("Link đổi mật khẩu đã hết hiệu lực"), HttpStatus.BAD_REQUEST);
        }
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return new ResponseEntity<>(new MessageResponse("Mật khẩu không trùng khớp"), HttpStatus.BAD_REQUEST);
        }
        User user = new User(username, request.getPassword());
        userService.updatePassword(user, request.getPassword());
        return new ResponseEntity<>(new MessageResponse("Đổi mật khẩu thành công"), HttpStatus.OK);
    }

    @PostMapping("/oauth/google")
    public ResponseEntity<?> google(@RequestBody SocialResponse jwtResponseSocial) throws IOException {
        final NetHttpTransport netHttpTransport = new NetHttpTransport();
        final JacksonFactory jacksonFactory = JacksonFactory.getDefaultInstance();
        GoogleIdTokenVerifier.Builder builder =
                new GoogleIdTokenVerifier.Builder(netHttpTransport, jacksonFactory)
                        .setAudience(Collections.singletonList("612774287153-uthnsrl25on17doe8413il68ebv9c969.apps.googleusercontent.com"));
        final GoogleIdToken googleIdToken = GoogleIdToken.parse(builder.getJsonFactory(), jwtResponseSocial.getToken());
        final GoogleIdToken.Payload payload = googleIdToken.getPayload();
        String email = payload.getEmail();
        Customer customer = customerService.findFakeMail(email);
        LoginResponse loginResponse = new LoginResponse();

        if (customer == null || customer.getUser() == null) {
            customer = new Customer();
            customer.setEmail(payload.getEmail());
            customer.setName((String) payload.get("name"));
            customer.setUser(new User(customer.getEmail(), null));

            userService.saveCreateGmail(customer.getUser());
            customerService.saveCreateGmail(customer);
            roleService.saveCreateGmail(customer.getEmail());

            loginResponse.setUsername(customer.getEmail());
            loginResponse.setAccessToken(jwtTokenUtil.generateJwtToken(customer.getEmail()));
            List<Role> roles = roleService.getRoleByUsername(customer.getEmail());
            List<String> nameRole = new ArrayList<>();
            for (Role role : roles) {
                nameRole.add(role.getName());
            }
            loginResponse.setRoles(nameRole);
            return ResponseEntity.ok(loginResponse);
        }

        User user = customer.getUser();
        if (user != null) {
            loginResponse.setAccessToken(jwtTokenUtil.generateJwtToken(customer.getEmail()));
            loginResponse.setUsername(customer.getEmail());
            List<Role> roles = roleService.getRoleByUsername(customer.getEmail());
            List<String> nameRole = new ArrayList<>();
            for (Role role : roles) {
                nameRole.add(role.getName());
            }
            loginResponse.setRoles(nameRole);
            return ResponseEntity.ok(loginResponse);
        }
        return ResponseEntity.ok(loginResponse);
    }

    @GetMapping("/findUsername")
    public ResponseEntity<?> showUsername(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        String username = jwtTokenUtil.getUsernameFromJwtToken(headerAuth.substring(7));
        Optional<User> user = userService.showUsername(username);
        if (user.isPresent()) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
