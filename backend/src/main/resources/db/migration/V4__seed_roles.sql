INSERT INTO roles (id, name, description, created_at, updated_at)
VALUES
    ('11111111-1111-1111-1111-111111111111'::uuid, 'ADMIN', 'Administrator role', NOW(), NOW()),
    ('22222222-2222-2222-2222-222222222222'::uuid, 'DOCTOR', 'Doctor role', NOW(), NOW()),
    ('33333333-3333-3333-3333-333333333333'::uuid, 'RECEPTIONIST', 'Receptionist role', NOW(), NOW()),
    ('44444444-4444-4444-4444-444444444444'::uuid, 'PATIENT', 'Patient role', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;
